module.exports = (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'POST') {
  
      if(req.originalUrl.search("notifications")){
        if (req.body["schedule_date"] && req.body["schedule_time"]) {
            req.body["schedule"] = Date.parse(req.body["schedule_date"].substring(0,11) + req.body["schedule_time"]) 
        }

      }
    }
  
    next()
}
  