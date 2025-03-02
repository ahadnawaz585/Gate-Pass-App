// import FaceHelper from "../helper/face-api.helper";
// import * as faceapi from 'face-api.js';

// export class FaceComparisonService {
//   public static async compareFace(
//     imageBase64: string,
//     employees: { id: string; image: string }[]
//   ): Promise<string | null> {
//     const inputDescriptor = await FaceHelper.getFaceDescriptor(imageBase64);
//     // if (!inputDescriptor) return null;

//     let bestMatch: { id: string; distance: number } | null = null;
//     for (const employee of employees) {
//       const descriptor = await FaceHelper.getFaceDescriptor(employee.image);
//       if (!descriptor) continue;
      
//       const distance = faceapi.euclideanDistance(inputDescriptor, descriptor);
//       if (!bestMatch || distance < bestMatch.distance) {
//         bestMatch = { id: employee.id, distance };
//       }
//     }
//     return bestMatch && bestMatch.distance < 0.6 ? bestMatch.id : null;
//   }
// }
