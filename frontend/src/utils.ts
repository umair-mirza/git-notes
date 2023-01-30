/*----------------------------Object to Array converter---------------------------*/
type Obj = {
  files: {
    fileName: {}
  }
}

interface FileInterface {
  fileName: string
  content: string
}

const filesObjectToArray = (obj: Obj) => {
  return Object.values(obj)
}

/*----------------------------Convert noteData to the correct format as per API specification---------------------------*/
const noteDataToFilesObject = (
  noteDescription: string,
  noteData: FileInterface[],
  deletedFileNames: string[]
) => {
  const files = {}

  noteData.forEach((note) => {
    files[note.fileName] = {
      content: note.content,
    }
  })

  //For file deletion. See Github Gist API Updating a Gist > Deleting a Gist File
  if (deletedFileNames.length > 0) {
    for (const fileName of deletedFileNames) {
      files[fileName] = null
    }
  }

  //Final data that will be submitted to the API
  const finalData = {
    description: noteDescription,
    files,
  }

  return finalData
}

export { filesObjectToArray, noteDataToFilesObject }
