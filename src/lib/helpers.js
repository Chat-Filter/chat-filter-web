import {
  faChartSimple,
  faEnvelope,
  faGear,
  faRightFromBracket,
  faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

export const sidebarOptions = [
  {id: "statistics", name: "Statistics", url: "/panel/organization/" + id + "/home", faIcon: faChartSimple, faColor: "#ffffff", faWidth: "20px"},
  {id: "pendingInvites", name: "Invites", url: "/panel/organization/" + id + "/invites", selected: true, faIcon: faEnvelope, faColor: "#ffffff", faWidth: "20px"},
  {id: "members", name: "Members", url: "/panel/organization/" + id + "/members", faIcon: faUsers, faColor: "#ffffff", faWidth: "20px"},
  {id: "settings", name: "Settings", url: "/panel/organization/" + id + "/settings", faIcon: faGear, faColor: "#ffffff", faWidth: "20px"},
  {id: "leave", name: "Leave", url: "/panel/organization/" + id + "/members", faIcon: faRightFromBracket, faColor: "#ffffff", faWidth: "20px"},
  {id: "delete", name: "Delete", url: "/panel/organization/" + id + "/leave", faIcon: faTrash, faColor: "#bb3131", faWidth: "20px"},
]