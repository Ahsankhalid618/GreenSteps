# Database Schema Validation Guide

This guide helps you verify and fix your Appwrite database schema to resolve the "Attribute not found in schema" error.

## 🔍 **Current Error**
```
AppwriteException: Invalid query: Attribute not found in schema: timestamp
```

This means your `actions` collection is missing required attributes.

## ✅ **Required Schema for Actions Collection**

### Collection: `actions`
- **Collection ID**: `actions`
- **Name**: `Actions`
- **Description**: `User eco-actions and their impact`

### Required Attributes:

| Attribute | Type | Size | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| `category` | String | 50 | ✅ | - | Action category (transportation, energy, etc.) |
| `description` | String | 1000 | ✅ | - | Action description |
| `difficulty` | Enum | - | ✅ | - | easy, medium, hard |
| `points` | Integer | - | ✅ | - | Points earned |
| `userId` | String | 255 | ✅ | - | User ID |
| `timestamp` | DateTime | - | ✅ | - | When action was performed |
| `carbonSaved` | Double | - | ✅ | - | CO₂ saved in kg |
| `waterSaved` | Double | - | ✅ | - | Water saved in liters |
| `wasteReduced` | Double | - | ✅ | - | Waste reduced in kg |

### Permissions:
- **Read**: Any
- **Create**: Users
- **Update**: Users
- **Delete**: Users

## 🛠️ **How to Fix Your Schema**

### Option 1: Add Missing Attributes (Recommended)

1. **Go to your Appwrite Console**
2. **Navigate to**: Databases → Your Database → Collections → `actions`
3. **Click**: "Add Attribute" for each missing attribute
4. **Create the following attributes**:

#### Add `timestamp` Attribute:
- **Key**: `timestamp`
- **Type**: `DateTime`
- **Required**: ✅ Yes
- **Default**: Leave empty

#### Add `carbonSaved` Attribute:
- **Key**: `carbonSaved`
- **Type**: `Double`
- **Required**: ✅ Yes
- **Default**: `0`

#### Add `waterSaved` Attribute:
- **Key**: `waterSaved`
- **Type**: `Double`
- **Required**: ✅ Yes
- **Default**: `0`

#### Add `wasteReduced` Attribute:
- **Key**: `wasteReduced`
- **Type**: `Double`
- **Required**: ✅ Yes
- **Default**: `0`

### Option 2: Recreate Collection (If Many Attributes Missing)

If you're missing many attributes, it might be easier to recreate the collection:

1. **Delete the existing `actions` collection**
2. **Create a new collection** with ID: `actions`
3. **Add all required attributes** as listed above
4. **Set permissions** as specified

## 🔧 **Quick Fix for Development**

If you want to test the application quickly without setting up the full schema, you can modify the code to use only basic attributes:

### Minimal Required Attributes:
- `category` (String, 50 chars)
- `description` (String, 1000 chars)
- `difficulty` (Enum: easy, medium, hard)
- `points` (Integer)
- `userId` (String, 255 chars)

The application will use `$createdAt` instead of `timestamp` and skip impact metrics.

## 🧪 **Testing Your Schema**

After setting up the attributes, test by:

1. **Try logging an action** in the actions page
2. **Check the browser console** for any remaining errors
3. **Verify data is saved** in your Appwrite console

## 🚨 **Common Issues**

### Issue: "Attribute not found in schema"
**Solution**: Add the missing attribute to your collection

### Issue: "Invalid query"
**Solution**: Check that all attributes used in queries exist in the schema

### Issue: "Permission denied"
**Solution**: Verify collection permissions are set correctly

### Issue: "Collection not found"
**Solution**: Ensure the collection ID matches exactly: `actions`

## 📋 **Complete Schema Checklist**

- [ ] `actions` collection exists
- [ ] `category` attribute (String, 50, Required)
- [ ] `description` attribute (String, 1000, Required)
- [ ] `difficulty` attribute (Enum: easy, medium, hard, Required)
- [ ] `points` attribute (Integer, Required)
- [ ] `userId` attribute (String, 255, Required)
- [ ] `timestamp` attribute (DateTime, Required)
- [ ] `carbonSaved` attribute (Double, Required)
- [ ] `waterSaved` attribute (Double, Required)
- [ ] `wasteReduced` attribute (Double, Required)
- [ ] Permissions set correctly
- [ ] Collection ID is exactly `actions`

## 🎯 **Next Steps**

1. **Fix the schema** using one of the methods above
2. **Test the actions page** to ensure it works
3. **Set up other collections** as needed (users, challenges, etc.)
4. **Refer to the main Database Setup Guide** for complete setup

Once your schema is correct, the actions page should work without errors!
