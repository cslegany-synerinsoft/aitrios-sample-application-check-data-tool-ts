/*
 * Copyright 2023 Sony Semiconductor Solutions Corp. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect, useContext, type MouseEvent } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import DataObjectIcon from '@mui/icons-material/DataObject'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import axios from '@/features/showcase/utils/axios'
import drawBoundingBox from '@/features/showcase/utils/drawBoundingBox'
import { TargetContext } from '@/features/showcase/stores'
import { type InferenceResult } from '@/features/showcase/types'
import SimpleSpinner from '@/components/elements/simpleSpinner'

export default function ShowWindow() {
  const [results, setResults] = useState<InferenceResult[]>([])
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const [popoverIndex, setPopoverIndex] = useState<number | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { targetDevice, targetDirectory } = useContext(TargetContext)

  useEffect(() => {
    if (targetDirectory === '') {
      setResults([])
    } else {
      setIsLoading(true)
      axios
        .get('/api/getImagesAndInferences', {
          params: {
            deviceId: targetDevice,
            imagePath: targetDirectory,
            numberOfImages: 5,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setResults(response.data)
          } else {
            window.alert('getImagesAndInferences : ERROR')
          }
        })
        .catch((error) => {
          if (error.response) {
            window.alert(error.response.data.message)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [targetDirectory])

  useEffect(() => {
    drawBoundingBox(results)
  }, [results])

  const handleIconClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    setAnchorElement(event.currentTarget)
    setPopoverIndex(index)
  }

  const handleIconClose = () => {
    setAnchorElement(null)
    setPopoverIndex(null)
  }

  const id = anchorElement != null ? 'simple-popover' : undefined

  return (
    <>
      <SimpleSpinner openBackdrop={isLoading} />
      <ImageList
        sx={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 240px))!important',
        }}
      >
        {results.map((result: InferenceResult, index: number) => (
          // Drawing an image in canvas
          <ImageListItem key={result.timestamp} data-testid="image-list-item">
            <canvas id={`canvas-${index.toString()}`} data-testid={`canvas${index.toString()}`} />
            {/* Place an icon at the top of the image to display the inference results in Popover */}
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0))',
              }}
              position="top"
              actionPosition="left"
              // Icon button to display Popover
              actionIcon={
                <div>
                  <IconButton
                    aria-describedby={id}
                    sx={{ color: 'white' }}
                    onClick={(event) => {
                      handleIconClick(event, index)
                    }}
                  >
                    <DataObjectIcon />
                  </IconButton>
                  <Popover
                    id={id}
                    open={popoverIndex === index}
                    anchorEl={anchorElement}
                    onClose={handleIconClose}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography sx={{ padding: 2 }}>
                      <pre>{JSON.stringify(JSON.parse(result.inferenceData), null, 2)}</pre>
                    </Typography>
                  </Popover>
                </div>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}
