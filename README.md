# Ads Management System (PTUDW-GR14)

A web application for managing outdoor advertising boards and handling citizen reports, with role-based access control and Google Maps API integration.  
This project was developed as a final assignment for the PTUDW course.

---

## 1. Features

- **Authentication & Authorization**
  - Citizen: view advertising boards on Google Maps, submit reports with description and images.
  - Ward/District/Department Officers: process reports, approve or reject requests, manage ad boards and locations.
  - Admin: manage user accounts, permissions, and system data.

- **Advertising Board Management**
  - Display all ad locations on Google Maps.
  - Show detailed information for each location: type of location, ad type, planning status, images.
  - CRUD operations for locations and boards.

- **Report & Request Management**
  - Citizens can submit reports (with content and image attachment).
  - Officers at each level can review and update the report status.
  - Approval workflow for requests to add or change ad boards.

- **Google Maps API Integration**
  - Interactive map view for ad boards and locations.
  - Clickable markers showing board details and reports.

- **Additional Features**
  - CAPTCHA validation for citizen report submissions.
  - Email notifications for new reports or status updates.
  - Workflow tracking: each report/request has a clear status history.

---

## 2. Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MySQL (via Sequelize ORM)  
- **Frontend**: Handlebars, HTML, CSS, JavaScript (AJAX)  
- **API**: Google Maps APIs  
- **Architecture**: MVC pattern  
- **Tools**: Git, npm  

---

## 3. Project Structure

- `app.js`: Main application file, configures Express server, middleware, and routes.  
- `routes/`: Define application routes (ads, users, reports, auth, etc.).  
- `models/`: Sequelize models for database entities.  
- `views/`: Handlebars templates for UI.  
- `static_web/`: Static assets (CSS, JS, images).  
- `middlewares/`: Custom middlewares (authentication, authorization, validation, etc.).  
- `ultis/`: Utility functions (e.g., database connection, helpers).  

---

## 4. Usage

- Citizens: browse ad boards on the map, submit violation reports.  
- Officers: view and process reports, approve/reject ad board requests.  
- Admin: manage users, permissions, and system data.  

---

## 5. Demo

Link to demo video/screenshots:  
[Google Drive Demo](https://drive.google.com/drive/folders/1v2E_rKqATg7tXbdA8BcxZ0Qw_164gQmb?fbclid=IwY2xjawNOJTNleHRuA2FlbQIxMABicmlkETE4ZlBsRmVPc0Q2UUNJUUI5AR4FaGTK38G_Wnlc79MLJTchQOZBcEno82NyeNbHbJ6Kwwk2kx1uS5xDB2jlfw_aem_pdz00Qi8x0UWexM3jOab1g)

---

## 6. Notes

- Database schema and seed data include at least 50 ad locations for testing.  
- `.env` file is required to configure database credentials and Google Maps API key.  
- `.env.example` should be provided for reference.  
- Follow MVC pattern, avoid SPA frameworks; AJAX is used for dynamic interactions.  

