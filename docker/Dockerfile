FROM node:20-alpine
WORKDIR /app

# Copy file quản lý package từ thư mục mern-demo vào container
COPY mern-demo/package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn (bao gồm cả thư mục server và models) vào container
COPY mern-demo/ .

EXPOSE 5000
CMD ["npm", "start"]