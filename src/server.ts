import config from "./config/config";
import app from "./main";

app.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
})
