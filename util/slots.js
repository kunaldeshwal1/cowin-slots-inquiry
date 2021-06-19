const axios = require('axios');
const chalk = require('chalk');
const Table = require("tty-table");
const notifier = require('node-notifier');
const { config, options } = require('./config');
module.exports = function (districtid) {
  let date = new Date();
  let todaysdate = `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  // Make a request for a user with a given ID
  axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${todaysdate}`, config)
    .then(function (response) {
      // handle success
      //console.table(response.data.states);
      let header = [{
        value: "centers",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "Center name",
        width: 20
      },
      {
        value: "address",
        color: "red",
        alias: "Center Address",
        width: 40,
      }, {
        value: "available",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "Available slot",
        width: 20
      },
      {
        value: "age",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "Age",
        width: 10
      },
      {
        value: "date",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "Date",
        width: 20
      }]

      let finalData = [];
      let distrtrictName;
      response.data.centers.forEach((item) => {
        distrtrictName = item.district_name;
        item.sessions.forEach((session) => {
          let ourData = {
            centers: item.name,
            address: item.address,
            available: session.available_capacity,
            age: session.min_age_limit,
            date: session.date
          };
          finalData.push(ourData);
        })
      });
      const out = Table(header, finalData, options).render()
      console.log(chalk.blue.bgRedBright.bold(`Date for which run -->${todaysdate}`))
      console.log(chalk.blue.bgRedBright.bold(`District -->${distrtrictName}`))
      console.log(out);
      notifier.notify({
        title: "There is some slots available",
        subtitle: 'subtitles',
        message: 'There is some slots available',
        wait: true
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}