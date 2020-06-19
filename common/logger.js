const winston = require('winston');

 
const logger = winston.createLogger({
    level: 'debug', // 최소 레벨
    // 파일저장
    transports: [
        new winston.transports.File({
            filename : './log/queue-server-error.log', // log 폴더에 queue-server.log 이름으로 저장
            zippedArchive: true, // 압축여부
            level:'error',
            maxSize: 5242880, // 5MB           
            maxFiles: 10, // 5MB - 5개 파일까지 생성 후 이후부터는 오래된 파일 삭제
            format: winston.format.printf(error => `${error.message}`)
                
        }),
        new winston.transports.File({
            filename : '../log/queue-server.log', // log 폴더에 queue-server.log 이름으로 저장
            zippedArchive: true, // 압축여부
            level:'info',

            maxSize: 5242880, // 5MB           
            maxFiles: 10, // 5MB - 5개 파일까지 생성 후 이후부터는 오래된 파일 삭제
            format: winston.format.printf(error => `${error.message}`)

        }),
      
    ]
});
 
module.exports = logger;


