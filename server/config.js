import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const { JWT_SECRET, API_KEY, API_SECRET, RDS_PORT, RDS_PASSWORD, RDS_USERNAME, RDS_DB_NAME, RDS_HOSTNAME } = process.env;

export default JWT_SECRET;