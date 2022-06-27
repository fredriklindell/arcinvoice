import { useState, useCallback } from 'react'
import { Avatar, Box, Grid, LinearProgress } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import styles from './DropzoneField.module.css'

const Dropzone = ({ multiple, onChange, logoUrl }) => {
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const url = 'https://api.cloudinary.com/v1_1/almpo/image/upload'

      acceptedFiles.forEach(async (acceptedFile) => {
        const formData = new FormData()
        formData.append('file', acceptedFile)
        formData.append('upload_preset', 'invoice')

        const response = await fetch(url, {
          method: 'post',
          body: formData,
        })
        setProgress(100)
        const data = await response.json()

        onChange(data.secure_url)
      })
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: 'image/*,application/pdf',
    multiple,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar
        alt={'logo-url'}
        src={logoUrl}
        sx={{ mr: 2, width: 50, height: 50 }}
      >
        {''}
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${
            isDragActive ? styles.active : null
          }`}
        >
          <input {...getInputProps()} />
          Upload Logo
        </div>
        <Grid item style={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Grid>
      </Box>
    </Box>
  )
}

// https://github.com/react-hook-form/react-hook-form/discussions/8295
const DropzoneField = (props) => {
  const { control, multiple, name } = props

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Dropzone
          multiple={multiple}
          onChange={(logoUrl) => {
            onChange(logoUrl)
          }}
          logoUrl={value}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default DropzoneField
