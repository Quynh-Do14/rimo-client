module.exports = {
  apps: [{
    name: "rimo", // Tên đúng theo thư mục (auto-ftchion -> auto-fusion?)
    script: "./node_modules/next/dist/bin/next",
    args: "start -p 4000", // Thêm port cụ thể
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "500M",
    env: {
      NODE_ENV: "production",
      PORT: 4000
    }
  }]
}