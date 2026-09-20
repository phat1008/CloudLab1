FROM node:20-alpine
WORKDIR /app

# Copy toàn bộ mã nguồn và cấu hình của client vào container
COPY . .

# Cài đặt các dependencies
RUN npm install

# Thực hiện build ứng dụng Vite/React
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]