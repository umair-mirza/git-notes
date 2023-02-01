export interface Note {
  url: string
  id: string
  public: boolean
  created_at: Date
  updated_at: Date
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

export type NoteDataType = {
  fileName: string
  content: string
}

export type Files = {}

export type UpdatedDataType = {
  noteId: string
  description: string
  files: Files
}

export type FinalDataType = {
  description: string
  files: Files
}
