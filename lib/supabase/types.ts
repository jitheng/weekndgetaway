export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          distance_from_bangalore: number
          travel_time: number
          trip_duration: string
          difficulty_level: string
          best_season: string[]
          estimated_cost: number
          latitude: number
          longitude: number
          route_description: string
          safety_tips: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          distance_from_bangalore: number
          travel_time: number
          trip_duration: string
          difficulty_level: string
          best_season: string[]
          estimated_cost: number
          latitude: number
          longitude: number
          route_description: string
          safety_tips?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          distance_from_bangalore?: number
          travel_time?: number
          trip_duration?: string
          difficulty_level?: string
          best_season?: string[]
          estimated_cost?: number
          latitude?: number
          longitude?: number
          route_description?: string
          safety_tips?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      destination_images: {
        Row: {
          id: string
          destination_id: string
          url: string
          alt_text: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          destination_id: string
          url: string
          alt_text?: string | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          destination_id?: string
          url?: string
          alt_text?: string | null
          is_primary?: boolean
          created_at?: string
        }
      }
      destination_activities: {
        Row: {
          id: string
          destination_id: string
          name: string
          description: string | null
          type: string
          created_at: string
        }
        Insert: {
          id?: string
          destination_id: string
          name: string
          description?: string | null
          type: string
          created_at?: string
        }
        Update: {
          id?: string
          destination_id?: string
          name?: string
          description?: string | null
          type?: string
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          user_id: string
          destination_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          destination_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          destination_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          destination_id: string
          user_id: string
          rating: number
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          destination_id: string
          user_id: string
          rating: number
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          destination_id?: string
          user_id?: string
          rating?: number
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      trip_plans: {
        Row: {
          id: string
          user_id: string
          destination_id: string
          start_date: string
          end_date: string
          notes: string | null
          estimated_budget: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          destination_id: string
          start_date: string
          end_date: string
          notes?: string | null
          estimated_budget?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          destination_id?: string
          start_date?: string
          end_date?: string
          notes?: string | null
          estimated_budget?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          destination_id: string
          user_id: string
          question: string
          answer: string | null
          answered_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          destination_id: string
          user_id: string
          question: string
          answer?: string | null
          answered_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          destination_id?: string
          user_id?: string
          question?: string
          answer?: string | null
          answered_at?: string | null
          created_at?: string
        }
      }
    }
  }
}