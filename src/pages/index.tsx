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

import { Box, Grid } from '@mui/material'
import Head from 'next/head'
import ResetButton from '@/features/showcase/components/resetButton'
import DeviceSelect from '@/features/showcase/components/deviceSelect'
import DirectorySelect from '@/features/showcase/components/directorySelect'
import ShowWindow from '@/features/showcase/components/showWindow'
import { TargetProvider } from '@/features/showcase/stores'

export default function Home() {
  return (
    <>
      <Head>
        <title>Checkdata Tool</title>
        <meta name="description" content="Visualization tool by AITRIOS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TargetProvider>
        <Box sx={{ flexGrow: 1, margin: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <DeviceSelect />
            </Grid>
            <Grid item xs={1}>
              <ResetButton />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item>
              <DirectorySelect />
            </Grid>
            <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
              <main>
                <ShowWindow />
              </main>
            </Box>
          </Grid>
        </Box>
      </TargetProvider>
    </>
  )
}
