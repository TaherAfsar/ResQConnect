import React, { useState } from 'react';
import Button from '@mui/material/Button';

function AddCategory({ onCreateCategory, onCancel }) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCreateCategory = () => {
    // Perform any necessary actions to create the category with newCategoryName.
    onCreateCategory(newCategoryName);
    // Reset the form
    setNewCategoryName('');
  };

  const onCloseForm = () => {
    // Reset the form and close it
    setNewCategoryName('');
    onCancel();
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Add Category
      </Typography>
      <input
        type="text"
        placeholder="Category Name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <Button onClick={handleCreateCategory}>Create</Button>
      <Button onClick={onCloseForm}>Cancel</Button>
    </div>
  );
}

export default AddCategory;
