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

import { type InferenceResult } from '../types'

const drawBoundingBox = (results: InferenceResult[]) => {
  const colors = [
    '#FF0000',
    '#FF8000',
    '#FFFF00',
    '#80FF00',
    '#00FF00',
    '#00FFFF',
    '#0080FF',
    '#0000FF',
    '#8000FF',
    '#FF00FF',
    '#FF0080',
    '#FFFFFF',
    '#C0C0C0',
    '#808080',
    '#000000',
  ]

  results.forEach((result, index) => {
    const canvasId = `canvas-${index.toString()}`
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (ctx != null) {
      const image = new Image()
      image.src = result.image
      const deserializedInferenceData = JSON.parse(result.inferenceData)

      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)
        for (let i = 0; i < Object.keys(deserializedInferenceData[0]).length; i += 1) {
          const boundingBox = deserializedInferenceData[0][i + 1]
          const { C, P, X, Y, x, y } = boundingBox

          if (C >= 0 && C < 20) {
            // Draw Box
            ctx.strokeStyle = colors[C]
            ctx.lineWidth = 3
            ctx.strokeRect(X, Y, Math.abs(x - X), Math.abs(y - Y))

            // Draw Label
            const text = `[${C.toString()}] : ${P.toString()}`
            ctx.font = 'bold 13px Arial'
            ctx.fillStyle = colors[C]
            ctx.fillRect(X, Y - 2, ctx.measureText(text).width + 10, 16)
            ctx.fillStyle = 'white'
            ctx.fillText(text, X + 5, Y + 10)
          }
        }
      }
    }
  })
}

export default drawBoundingBox
