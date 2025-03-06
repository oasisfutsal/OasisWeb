# Oasis Futsal Academy Website

## Newsletter Section

The website now includes a modern newsletter section on the home page that displays the latest news from the academy. The news articles are stored in Firebase and can be managed through an admin panel.

### Features

- Modern, sleek design with card-based layout
- Support for images within news cards
- Categories for different types of news
- Admin panel for adding, editing, and deleting news articles
- Firebase integration for data storage and image uploads

### Setup Instructions

1. **Firebase Setup**

   1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   2. Add a web app to your Firebase project
   3. Enable Firestore Database and Storage in your Firebase project
   4. Set up security rules for Firestore and Storage
   5. Get your Firebase configuration (apiKey, authDomain, projectId, etc.)

2. **Update Firebase Configuration**

   Update the Firebase configuration in the following files with your own Firebase project details:
   
   - `src/components/NewsletterSection.js`
   - `src/components/NewsAdmin.js`
   
   Replace the placeholder values with your actual Firebase configuration:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

3. **Firestore Database Structure**

   The newsletter section uses a Firestore collection called `news` with the following document structure:
   
   ```
   news (collection)
     |- document_id
         |- title: string
         |- excerpt: string
         |- content: string
         |- category: string
         |- date: timestamp
         |- imageUrl: string (optional)
         |- imagePath: string (optional)
         |- slug: string
   ```

4. **Storage Structure**

   News images are stored in Firebase Storage in the following path:
   
   ```
   news-images/[timestamp]-[filename]
   ```

### Using the Admin Panel

1. Access the admin panel at `/admin/news`
2. Add new news articles by filling out the form on the left
3. Edit or delete existing news articles using the buttons on each news item
4. Images can be uploaded and will be stored in Firebase Storage

### Customization

- **Categories**: You can customize the available categories by modifying the options in the category dropdown in `src/components/NewsAdmin.js`
- **Styling**: Modify the CSS in `src/components/NewsletterSection.module.css` and `src/components/NewsAdmin.module.css` to match your design preferences
- **Number of Articles**: By default, the newsletter section displays 3 articles at a time. You can change this by modifying the `limit` parameter in the Firestore query in `src/components/NewsletterSection.js`

### Security Considerations

- The admin panel is currently accessible to anyone who knows the URL. In a production environment, you should implement authentication to restrict access to authorized users only.
- Consider adding Firebase Authentication and security rules to protect your data.
