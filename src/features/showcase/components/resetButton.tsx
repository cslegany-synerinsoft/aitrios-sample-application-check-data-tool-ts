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

import { useContext } from 'react'
import CachedIcon from '@mui/icons-material/Cached'
import Button from '@mui/material/Button'
import { setTargetContext } from '@/features/showcase/stores'

export default function ResetButton() {
  const { setTargetDevice, setTargetDirectory } = useContext(setTargetContext)

  return (
    <Button
      variant="outlined"
      sx={{ padding: 1.8 }}
      onClick={() => {
        setTargetDevice('')
        setTargetDirectory('')
      }}
    >
      <CachedIcon />
    </Button>
  )
}
