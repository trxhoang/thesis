
CREATE USER 'trxhoang'@'%' IDENTIFIED BY 'trxhoang@1235';
ALTER USER 'trxhoang'@'%' IDENTIFIED WITH mysql_native_password BY 'trxhoang@1235';
GRANT ALL PRIVILEGES ON * . * TO 'trxhoang'@'%';
flush privileges;