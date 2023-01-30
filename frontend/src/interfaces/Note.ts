export interface Note {
  url: string
  id: string
  public: boolean
  created_at: string
  updated_at: string
  description: string
  files: {
    filename: {
      filename: string
      content: string
    }
  }
  owner: {
    login: string
    id: string
    avatar_url: string
  }
}
