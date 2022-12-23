// EVENT

const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get(
  "/event",
  asyncMw(async (req, res) => {
    const events = await repository.event.findAll(
      {},
      req.query,
      req.filterQueryParser
    );
    res.render("event", {
      cssEjs: "event",
      eventEJS: _.orderBy(events.rows, ["id"], ["desc"]),
    });
  })
);

router.get("/event-create", (req, res, next) => {
  if (!req.user) {
    res.redirect("/not-authorized");
    next();
  } else {
    res.render("admin/event-create");
  }
});

router.post(
  "/event-create",
  asyncMw(async (req, res) => {
    let month = req.body.createEventMonth.slice(5, 7);

    let mon = "";
    switch (month) {
      case "01":
        mon = "Jan";
        break;
      case "02":
        mon = "Feb";
        break;
      case "03":
        mon = "Mar";
        break;
      case "04":
        mon = "Apr";
        break;
      case "05":
        mon = "May";
        break;
      case "06":
        mon = "Jun";
        break;
      case "07":
        mon = "Jul";
        break;
      case "08":
        mon = "Aug";
        break;
      case "09":
        mon = "Sep";
        break;
      case "10":
        mon = "Oct";
        break;
      case "11":
        mon = "Nov";
        break;
      case "12":
        mon = "Des";
        break;
    }

    let newevent = {
      title: req.body.createEventTitle,
      address: req.body.createEventAddress,
      time: req.body.createEventTime,
      month: mon,
      date: req.body.createEventDate,
      image: req.body.createEventPoster,
      description: req.body.createEventDescription,
      registration: req.body.createEventRegis,
    };
    // events.unshift(newevent);
    await repository.event.create(newevent);
    res.redirect("/");
  })
);

router.get(
  "/event-update",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const event = await repository.event.findAll(
        {},
        req.query,
        req.filterQueryParams
      );
      res.render("admin/event-update", {
        event: _.orderBy(event.rows, ["id"], ["desc"]),
      });
    }
  })
);

router.post("/event-update", (req, res) => {
  // changeIndex = Number(req.body.eventIndex);
  // console.log(changeIndex);
  res.redirect(`/event-update-2?id=${req.body.id}`);
});

router.get(
  "/event-update-2",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const event = await repository.event.findOne(req.query.id);

      res.render("admin/event-update-2", {
        inheritEventId: event.id,
        inheritEventTitle: event.title,
        inheritEventAddress: event.address,
        inheritEventTime: event.time,
        inheritEventDate: event.date,
        inheritEventPoster: event.image,
        inheritEventRegis: event.registration,
        inheritEventDescription: event.description,
      });
    }
  })
);

router.post(
  "/event-update-2",
  asyncMw(async (req, res) => {
    let month = req.body.inheritEventMonth.slice(5, 7);

    let mon = "";
    switch (month) {
      case "01":
        mon = "Jan";
        break;
      case "02":
        mon = "Feb";
        break;
      case "03":
        mon = "Mar";
        break;
      case "04":
        mon = "Apr";
        break;
      case "05":
        mon = "May";
        break;
      case "06":
        mon = "Jun";
        break;
      case "07":
        mon = "Jul";
        break;
      case "08":
        mon = "Aug";
        break;
      case "09":
        mon = "Sep";
        break;
      case "10":
        mon = "Oct";
        break;
      case "11":
        mon = "Nov";
        break;
      case "12":
        mon = "Dec";
        break;
    }

    let newevent = {
      title: req.body.inheritEventTitle,
      address: req.body.inheritEventAddress,
      time: req.body.inheritEventTime,
      month: mon,
      date: req.body.inheritEventDate,
      image: req.body.inheritEventPoster,
      description: req.body.inheritEventDescription,
      registration: req.body.inheritEventRegis,
    };
    // events[changeIndex] = newevent;
    await repository.event.update(req.query.id, newevent);
    res.redirect("/");
  })
);

router.get(
  "/event-delete",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const events = await repository.event.findAll();
      res.render("admin/event-delete", { event: events.rows });
    }
  })
);

router.post(
  "/event-delete",
  asyncMw(async (req, res) => {
    // changeIndex = Number(req.body.arrayIndex);
    // events.splice(changeIndex, 1);
    await repository.event.delete(req.body.id);
    res.redirect("/");
  })
);

module.exports = router;
