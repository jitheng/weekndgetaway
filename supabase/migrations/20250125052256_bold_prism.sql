/*
  # Initial Schema for Weekend Getaway Planner

  1. New Tables
    - `destinations`
      - Core table storing all weekend getaway destinations
      - Includes location, difficulty, costs, and metadata
    - `destination_images`
      - Stores multiple images per destination
    - `destination_activities`
      - Activities available at each destination
    - `user_favorites`
      - Tracks user's favorite destinations
    - `reviews`
      - User reviews and ratings for destinations
    - `trip_plans`
      - User-created trip plans
    - `questions`
      - User questions about destinations
    
  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Public read access to destinations and images
      - Authenticated user access for favorites, reviews, and plans
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  distance_from_bangalore NUMERIC NOT NULL,
  travel_time NUMERIC NOT NULL,
  trip_duration TEXT NOT NULL,
  difficulty_level TEXT NOT NULL,
  best_season TEXT[] NOT NULL,
  estimated_cost NUMERIC NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  route_description TEXT NOT NULL,
  safety_tips TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Destination images
CREATE TABLE IF NOT EXISTS destination_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activities available at destinations
CREATE TABLE IF NOT EXISTS destination_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, destination_id)
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trip plans
CREATE TABLE IF NOT EXISTS trip_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  notes TEXT,
  estimated_budget NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Policies

-- Destinations: anyone can view
CREATE POLICY "Anyone can view destinations"
  ON destinations FOR SELECT
  TO public
  USING (true);

-- Destination images: anyone can view
CREATE POLICY "Anyone can view destination images"
  ON destination_images FOR SELECT
  TO public
  USING (true);

-- Destination activities: anyone can view
CREATE POLICY "Anyone can view destination activities"
  ON destination_activities FOR SELECT
  TO public
  USING (true);

-- User favorites: users can manage their own favorites
CREATE POLICY "Users can manage their favorites"
  ON user_favorites
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews: anyone can view, authenticated users can create
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trip plans: users can manage their own plans
CREATE POLICY "Users can manage their trip plans"
  ON trip_plans
  TO authenticated
  USING (auth.uid() = user_id);

-- Questions: anyone can view, authenticated users can create
CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create questions"
  ON questions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);