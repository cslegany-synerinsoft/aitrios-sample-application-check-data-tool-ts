/**
 * @jest-environment jsdom
 */

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

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import DirectorySelect from '@/features/showcase/components/directorySelect'

const interceptionData = ['testDirectory-1', 'testDirectory-2', 'testDirectory-3']

const mockServer = setupServer(
  rest.get('/api/getImageDirectories', (req, res, ctx) => res(ctx.status(200), ctx.json(interceptionData))),
)

describe('DirectorySelect', () => {
  beforeAll(() => {
    mockServer.listen()
  })
  afterAll(() => {
    mockServer.close()
  })
  it('should display directories when loaded', async () => {
    render(<DirectorySelect />)

    // wait for API response asynchronously
    await waitFor(() => {})

    // wait for re-rendering
    await waitFor(() => {
      const listItems = screen.getAllByTestId('directory-select-item')

      listItems.forEach((listItem, index) => {
        const directoryNameButton = within(listItem).getByRole('button') as HTMLInputElement
        expect(directoryNameButton).toHaveTextContent(interceptionData[index])
      })
    })
  })
})
