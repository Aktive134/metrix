// cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';
import Configuration from './index';

const { cloudinary_setup: { cloud_api_key, cloud_api_secret, cloud_name } } = Configuration;

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret,
});

export default cloudinary;
