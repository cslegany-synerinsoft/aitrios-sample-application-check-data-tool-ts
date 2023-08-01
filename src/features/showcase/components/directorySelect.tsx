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

import { useEffect, useState, useContext, type MouseEvent } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import axios from '@/features/showcase/utils/axios'
import { TargetContext, setTargetContext } from '@/features/showcase/stores'
import { type DirectoryName } from '@/features/showcase/types'
import SimpleSpinner from '@/components/elements/simpleSpinner'

export default function DirectorySelect() {
  const [directories, setDirectories] = useState<DirectoryName[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { targetDevice } = useContext(TargetContext)
  const { setTargetDirectory } = useContext(setTargetContext)

  useEffect(() => {
    if (targetDevice === '') {
      setDirectories([])
    } else {
      setIsLoading(true)
      axios
        .get('/api/getImageDirectories', {
          params: {
            deviceId: targetDevice,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setDirectories(response.data)
          } else {
            window.alert('getImageDirectories : ERROR')
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
  }, [targetDevice])

  const hundleClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    setTargetDirectory(event.currentTarget.innerText)
    setSelectedIndex(index)
  }

  return (
    <>
      <SimpleSpinner openBackdrop={isLoading} />
      <List>
        {directories.map((directory: DirectoryName, index: number) => (
          <ListItem key={directory} disablePadding divider data-testid="directory-select-item">
            <ListItemButton
              key={directory}
              selected={selectedIndex === index}
              onClick={(event) => {
                hundleClick(event, index)
              }}
            >
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary={directory} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
