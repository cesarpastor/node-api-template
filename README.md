# node-api-template
Node api project template


Create a .env file with the values sample bellow



NODE_ENV=dev  
PORT=3000  
DB_USERNAME=root  
DB_PASSWORD=root  
DB_NAME=sampleDb  
DB_HOST=localhost  
DB_PORT=13306  
DB_URL=jdbc:mariadb://192.168.99.100:13306/affiliate_db?useSSL=false&useUnicode=true&characterEncoding=UTF-8  
JWT_SECRET=f!DT3[i+Zl(W}17:%@]Tly*#/F&&L  
ENC_SECRET_KEY=EDmkTd9jo8QTy6b8  

  
## Login endpoint  

http://localhost:3000/api/v1/auth/login  

### BODY

{
    "username" : "loybu",
    "password" : "password123"
}  

  
  
## Secured endpoint  
  
### Header  
  
Key: Authorization  
Value:  Bearer {token from login endpoint}
