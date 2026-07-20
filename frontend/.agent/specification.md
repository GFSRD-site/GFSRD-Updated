## Admin feature support

### Admin auth
Admin should be able to login with email and password, and receive a JWT token for authentication.

route: /admin/login 
route: /admin/logout (to invalidate the token)
route: /admin (dashboard page [with sidebar for all the navigation features])

### Contact section support
Admin should be able to view and manage contact information, including adding, editing, and deleting contacts.
- user can submit contact query from frontend and it should be saved into the database for admin to review and respond.
- the frontend will be given a seperate API to fetch the contact query list for admin to review and respond.
- admin can also respond to contact queries from the admin panel.
- see all the list of query in the admin panel, and click on each query to view the details and respond to it. (action to delete the queries)


### Newsletter feature
Admin should be able to manage newsletter subscriptions, including adding and removing subscribers (from admin panel itself).

- user can submit newsletter subscription from frontend and it should be saved into the database for admin to review and manage.
- the frontend will be given a seperate API to fetch the newsletter subscription list for admin to review and manage.



### Technology used 
- for frontend: we are using react and tailwindcss for styling.
- for backend: we are using nodejs with express framework, and prisma as our database.


#### Schema design
- User schema: includes fields for email, password, and role (admin or user).
- Contact schema: includes fields for name, email, message, and timestamp.
- Carrier schema: includes fields for name, contact information, and services offered (now only internship openings).
