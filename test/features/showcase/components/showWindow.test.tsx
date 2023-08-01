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
import 'jest-canvas-mock'

import ShowWindow from '@/features/showcase/components/showWindow'

const interceptionData = [
  {
    image: 'image',
    inferenceData: '[{"1":{"C":0,"P":0.69140625,"X":143,"Y":115,"x":156,"y":183}}]',
    timestamp: '20230126080637492',
  },
]

const mockServer = setupServer(
  rest.get('/api/getImagesAndInferences', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(interceptionData)),
  ),
)

describe('ShowWindow', () => {
  beforeAll(() => {
    mockServer.listen()
  })
  afterAll(() => {
    mockServer.close()
  })
  it('should display images with popover button', async () => {
    render(<ShowWindow />)

    // wait for API response asynchronously
    await waitFor(() => {})

    // wait for re-rendering
    await waitFor(() => {
      const listItems = screen.getAllByTestId('image-list-item')

      listItems.forEach((listItem, index) => {
        const canvas = within(listItem).getByTestId(`canvas${index.toString()}`)
        expect(canvas).toBeInTheDocument()
        const popoverButton = within(listItem).getByRole('button')
        expect(popoverButton).toBeEnabled()
      })
    })
  })
})
