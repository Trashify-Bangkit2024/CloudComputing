FROM node:18

# Create app directory
WORKDIR /app

ENV PORT=8080
ENV HOST=0.0.0.0
ENV TYPE=service_account
ENV PROJECT_ID=trashify-426015
ENV PRIVATE_KEY_ID=851bc59106a5599dc7470bd8ba874cfbae924afa
ENV PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKj6mpo0EID3bR\n/yBNGQVjB288r04DrRTYBNwXFEVzXm5Fckf1RjLBY6pr86m1cKXCjyOMK30f870T\nTGKSKmirHARNEGk7hOCXNhm0VgOCJ8HxWNHV9HBrQhpS3UTly5ks4ZfWPGGGaym2\n1JM/HkqhJVkrrEU1xEXuKo+EGo5mxs+vwN0SDFufKxxBJLmkC7u00HkWL41BRGnk\nLuiRpxr8xDgA7jPrNAF6qrgrWdJsrj5AGL5Zy67UGsSSBnraf97yWMbSN8s2H9us\nnQC6OijNHQ/0/ZoXGBr70jbNNddPMC7dpTxNmGyoXjyrJHYvGpTfbhLaUHBsCefd\nWQpIjbhvAgMBAAECggEAPjTxb0nWGmIZZPNbWaICAAAT/sh9hm58lLylVKcijwQk\njEpE5APbaX2wpDdv2mtOVJo92fmvEwV4/vi52taQT2Aqx/nuv1sW2AlCypmRuUJ5\ncqOKyZCoh6AE0obmdkXY9CoRxbbEYpH9fQr6b2tfku6T3HAqzxDIQxSp/3FiYxhG\nK6eJJO/N8rwSZs0e2q3C9+D0l4tDvylN4BkkfEQq9j7xhZCTD+OVr1HTNAWy6tTv\nzNc2Q7EHmDBXOHdDVlOt3Lbc+5YlSPa33L7JgCd2d8WbXfbGOFOqbQB/DlbQ9cx/\nyGKITxmU1D1qg9MuZqcmMgLRsbikijGU1ZOzP6sWgQKBgQDxbEDg2lqKqki/kYF8\n4rMjK278oSadbnx22Xz0wUPErS+om3lgJW0EkVRWUiHJg3GHc5AAk6i2cWyViLbg\nSDjOiTz7mxYt0VwEuMSDnRXXLcHScCLIX/lRs+SHSc7OK7YtmXth2o3xqJDEhHN7\nZ6zse8K2YGhR+x+PUol2UL/LgQKBgQDWyrZlSalfNiXhzdvoRKlGKb5VN6VVKtTb\n+EIGkfVi76TyJPkvbHpThsYFeyi4ozsKLa32ttmu1PdkappdjfjJHM0Wzusc+cSj\nCCNGy7Y3hNxSqG+XT+2SNARZ4YqfBjc9LuRz917C1216X74LyyROWhql+B/3lb5K\nlj0qXZg77wKBgD9wJ7guCF6pkkYscO8lDtduAVMG8YOq1a/RRIF4C1ux+nT+ra0z\nCGuL2LJ6EIDINlvWZP+RzWJreZHtg8h5kdvLuiePQAu4GMrw1kqTS3rofibS6oDm\nnzf14lYeceZBHDTtQLuc13Gpzqik+UdzHcBiYO7VdHQeXdOmZ5Kcc1mBAoGBAIrs\nSdRxNE8UoqPNlfJAlot+7FAJ0bGoJkyv4WSGewQmo7TKHTGDJAtqHCHnaoshaEpJ\nCT+NPHZL4EbefEEOVl8ddbjO1FrFYV1hIg/kKlL2Z9o+fw6K78mkQzwvGI2KY6f6\n8F/hGzVCSNjhm/XcyfqzZJD8TxC/lXiAe8cvCguZAoGAcgjdRjNFWHmbrW1kfO55\nVHX6B9hhhVrW/5cSbwonW2yG+B/JpXhYuODLAcXMwfK1UBqOPorGBbZMEDA/TaQg\nx9okUifWC03qHGf+yVY7LRlits+dLTfB3X+F3I8HIvZN7isFueSkZgl/4o1Wae+6\nkxCSq59G1Nu1jxgF/1nuc7k=\n-----END PRIVATE KEY-----\n"
ENV CLIENT_EMAIL=firebase-adminsdk-6w9to@trashify-426015.iam.gserviceaccount.com
ENV CLIENT_ID=114710198768596485229
ENV AUTH_URI=https://accounts.google.com/o/oauth2/auth
ENV TOKEN_URI=https://oauth2.googleapis.com/token
ENV AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
ENV CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6w9to%40trashify-426015.iam.gserviceaccount.com
ENV UNIVErSE_DOMAIN=googleapis.com
ENV SESSION_SECRET=hsdioasdhaIHAIHSdiauewqidnsa0128321
ENV DATABASE_URL=https://trashify-426015.firebaseapp.com/
# ENV MODEL_URL=https://storage.googleapis.com/trashify-model/trashify_model.json

# Copy package.json and package-lock.json for dependency management
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port
EXPOSE 8080

# Start the server using the configured script
CMD [ "node", "index.js" ]