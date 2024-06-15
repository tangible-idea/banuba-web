
import { RekognitionClient, DetectFacesCommand } from '@aws-sdk/client-rekognition';


export const analyzeImage = async () => {
    if (!image) {
      alert('Please upload an image');
      return;
    }

    try {
      const client = new RekognitionClient({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        },
      });

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const params = {
          Image: {
            Bytes: new Uint8Array(arrayBuffer),
          },
          Attributes: ['ALL'],
        };

        const command = new DetectFacesCommand(params);
        const response = await client.send(command);
        if (response.FaceDetails && response.FaceDetails.length > 0) {
          const ageRange = response.FaceDetails[0].AgeRange;
          setAgeRange(ageRange);
        } else {
          setAgeRange(null);
          alert('No faces detected');
        }
      };

      fileReader.readAsArrayBuffer(image);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };
  