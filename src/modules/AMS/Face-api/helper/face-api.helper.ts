// import * as faceapi from 'face-api.js';
// import { Canvas, Image, createCanvas, loadImage } from 'canvas';
// import * as path from 'path';
// // import * as tf from '@tensorflow/tfjs-node-gpu';
// // import * as tf from '@tensorflow/tfjs-node';


// export default class FaceHelper {
//   private static modelsLoaded = false;

//   private static async loadModels(): Promise<void> {
//     // const model = tf.sequential();
//     // console.log(tf.version)
//     if (this.modelsLoaded) return;
//     const modelPath = path.join(__dirname, '../../../../assets/models');
//     await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
//     await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
//     await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
//     this.modelsLoaded = true;
//   }

//   public static async getFaceDescriptor(imageBase64: string): Promise<Float32Array | null> {
//     await this.loadModels();
//     const img = await this.base64ToImage(imageBase64);
//     const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();
//     return detections ? detections.descriptor : null;
//   }

//   private static async base64ToImage(base64: string): Promise<faceapi.TNetInput> {
//     const buffer = Buffer.from(base64, 'base64');
//     const img = await loadImage(buffer);
//     const canvas = createCanvas(img.width, img.height);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0, img.width, img.height);

//     // Cast canvas to TNetInput
//     return canvas as unknown as faceapi.TNetInput;
// }

// }
