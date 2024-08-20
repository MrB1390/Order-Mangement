Order Management Application
---------------------------

This is a simple Order Management Application built using React.js. It allows users to perform CRUD (Create, Read, Update, Delete) operations on user data,order data,category data,product data for only Admins and Users only allowed for product cart,order data stored in a mock API.

Technologies Used
-----------------

*   React.js
*   Redux
*   React Router
*   Formik
*   Yup
*   React Toastify

### Redux Page 
### Actions

#### Product Actions

*   `prdDataFetch`: Initiates fetching product data.
*   `prdDataFetchSuccess`: Signals successful fetching of product data.
*   `prdDataFetchFailure`: Signals failure in fetching product data.
*   `prdDataAddSuccess`: Signals successful addition of a new product.
*   `prdDataAddFailure`: Signals failure in adding a new product.
*   `prdDataFetchById`: Initiates fetching of a product by ID.
*   `prdDataFetchByIdSuccess`: Signals successful fetching of a product by ID.
*   `prdDataFetchByIdFailure`: Signals failure in fetching a product by ID.
*   `prdDataEditSuccess`: Signals successful editing of a product.
*   `prdDataEditFailure`: Signals failure in editing a product.
*   `prdDataDeleteSuccess`: Signals successful deletion of a product.
*   `prdDataDeleteFailure`: Signals failure in deleting a product.

#### Category Actions

*   Similar actions as above, but for category data.

#### Customer Actions

*   Similar actions as above, but for customer data.

#### Order Actions

*   Similar actions as above, but for order data.

### Reducer

The reducer manages the state for order-related data, including products, categories, customers, and orders.The Redux store configuration sets up the store for managing order-related data using Redux Toolkit.

### API Component
These async action creators are designed to interact with an API backend to perform CRUD (Create, Read, Update, Delete) operations on various entities including products, categories, customers, and orders.
*   **Fetching Data**: `fetchProduct`, `fetchCategory`, `fetchCustomer`, `fetchOrder`
*   **Adding Data**: `productAdd`, `categoryAdd`, `customerAdd`, `orderAdd`
*   **Fetching Data by ID**: `fetchProductById`, `fetchCategoryById`, `fetchCustomerById`, `fetchOrderById`
*   **Updating Data by ID**: `productUpdateById`, `categoryUpdateById`, `customerUpdateById`, `orderUpdateById`
*   **Deleting Data by ID**: `productDeleteById`, `categoryDeleteById`, `customerDeleteById`, `orderDeleteById`

Features
--------
1\. Product Add
---------------

### Description:

*   Allows users to add new products to the system.
*   Validates input fields such as product name, description, price, status, category, and image.
*   Submits the form data to the server upon successful validation.
*   Displays appropriate error messages if any validation fails.

### Usage:

*   Navigate to the "Add Product" page.
*   Fill in the required details for the new product.
*   Upload an image representing the product.
*   Click the "Submit" button to add the product to the system.

2\. Product Cart
----------------

### Description:

*   Displays a list of available products with their details such as ID, name, price, and image.
*   Allows users to add products to a shopping cart and specify the quantity.
*   Calculates the total price based on the items in the cart.
*   Provides options to remove items from the cart or proceed to place an order.

### Usage:

*   Browse through the available products listed in the cart.
*   Click the "Add to Cart" button to add a product to the cart.
*   Adjust the quantity or remove items as needed.
*   Click the "Place Order" button to proceed with the checkout process.

3\. Product Edit
----------------

### Description:

*   Enables users to edit existing product details.
*   Fetches the current product details from the server and pre-fills the form for editing.
*   Validates the modified input fields before submitting the changes.
*   Updates the product information in the system upon successful validation.

### Usage:

*   Navigate to the "Edit Product" page.
*   Select the product you want to edit from the list.
*   Modify the desired fields such as name, description, price, status, category, or image.
*   Click the "Update" button to save the changes.

4\. Product List
----------------

### Description:

*   Displays a table of all available products in the system.
*   Provides options to view, edit, or delete individual products.
*   Fetches product data from the server and populates the table dynamically.
*   Allows users to manage products efficiently through CRUD operations.

### Usage:

*   Access the "Product List" page to view all products.
*   Perform actions such as editing or deleting specific products as needed.
*   Click the "Add Product" button to add new products to the system.


### Its Similar For Category,Order,Customer

### 2\. Category Management

*   **Add Category**: Users can add new categories along with an image representing the category.
*   **Edit Category**: Provides functionality to modify existing category details including name and image.
*   **Delete Category**: Allows users to remove categories from the system, along with associated products if any.
*   **Category List**: Displays a list of all categories with their respective details such as ID, image, and name.

### 3\. Customer Management

*   **Add Customer**: Users can add new customer details including first name, last name, email, phone number, role, and image.
*   **Edit Customer**: Provides functionality to modify existing customer details such as name, email, phone number, and role.
*   **Delete Customer**: Allows users to remove customer details from the system.
*   **Customer List**: Displays a list of all customers with their respective details such as ID, name, email, phone number, and role.

### 4\. Order Management

*   **Order List**: Provides functionality to view a list of all orders placed by customers, including details such as order ID, customer details, products ordered, quantity, and total price.
*   **Order Details**: Allows users to view detailed information about a specific order, including order ID, customer details, product details, order date, and status.
*   **Update Order Status**: Enables users to update the status of an order, such as "Processing", "Shipped", "Delivered", etc.

### SideBar Component
The `Sidebar` component is a navigation panel used to navigate between different sections of the application. It provides links to various pages and functionalities based on the user's type (admin or user).

### Admin Credentials: 
**User Id**:balaworkcc@gmail.com,
**Password**:12345

Features
--------

*   Toggleable visibility of section names
*   Dynamic rendering of sections based on user type (admin or user)
*   Navigation links to different pages such as product management, category management, customer management, order management, and logout functionality
*   Utilizes icons for better visual representation of sections

