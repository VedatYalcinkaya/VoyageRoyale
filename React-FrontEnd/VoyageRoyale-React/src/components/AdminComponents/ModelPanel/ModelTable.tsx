// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   InputAdornment,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   useAppDispatch,
//   useAppSelector
// } from "../../../store/configureStore";
// import { deleteModel } from "../../../store/slices/deleteModelSlice";
// import { getAllModel } from "../../../store/slices/CarSlices/carModelSlice";
// import { postCarModel } from "../../../store/slices/addCarModelSlice";
// import { updateModel } from "../../../store/slices/updateModelSlice";

// export default function ModelTable() {
//   const dispatch = useAppDispatch();
//   const models = useAppSelector((state) => state.carModel.data);
//   const [editIndex, setEditIndex] = useState(-1);
//   const [editedModelName, setEditedModelName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState(false);
//   const [selectedModelToDelete, setSelectedModelToDelete] = useState<any>(null);
//   const [isUpdateMode, setIsUpdateMode] = useState(false); 
//   const [updatedModelId, setUpdatedModelId] = useState(""); 
//   const [selectedBrand, setSelectedBrand] = useState(""); // State for selected brand

//   const handleEditClick = (index: any, name: any) => {
//     setEditIndex(index);
//     setEditedModelName(name);
//     setIsUpdateMode(true);
//   };

//   const handleSaveClick = async () => {
//     if (isUpdateMode && updatedModelId) {
//       try {
//         const updatedModel = { id: updatedModelId, name: editedModelName };
//         await dispatch(updateModel(updatedModel));
//         await dispatch(getAllModel());
//         setEditIndex(-1);
//         setEditedModelName("");
//         setIsUpdateMode(false);
//         setUpdatedModelId("");
//       } catch (error) {
//         console.error("Error updating Model:", error);
//       }
//     } else {
//       try {
//         const newModel = { name: editedModelName, brand: selectedBrand }; // Include selected brand
//         await dispatch(postCarModel(newModel));
//         await dispatch(getAllModel());
//         setEditedModelName("");
//       } catch (error) {
//         console.error("Error adding new record:", error);
//       }
//     }
//   };

//   const handleAddRowClick = () => {
//     setEditIndex(-1);
//     setEditedModelName("");
//     setIsUpdateMode(false);
//   };

//   const handleDeleteClick = async (model: any) => {
//     setSelectedModelToDelete(model);
//     setIsDeleteConfirmationOpen(true);
//   };

//   // Implement other handlers (handleInputChange, handleDeleteConfirmation, etc.)

//   return (
//     <div>
//       <Button
//         onClick={handleAddRowClick}
//         variant="contained"
//         color="primary"
//         sx={{
//           mb: 2,
//           fontSize: 12,
//           color: "#d4d2a9",
//           backgroundColor: "#0F4037",
//           "&:hover": {
//             backgroundColor: "#B58B5D",
//             color: "#0f4037",
//           },
//         }}
//       >
//         Add a New Record
//       </Button>

//       <TextField
//         label="Quick Search"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="start">
//               <IconButton>
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       {/* Dropdown for selecting brand */}
//       <Select
//         value={selectedBrand}
//         onChange={(e) => setSelectedBrand(e.target.value)}
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//       >
//         <MenuItem value="">Select Brand</MenuItem>
//         {/* Populate the dropdown with brand names */}
//         <MenuItem value="Brand 1">Brand 1</MenuItem>
//         <MenuItem value="Brand 2">Brand 2</MenuItem>
//         {/* Add more brand names as needed */}
//       </Select>

//       {/* Table structure remains the same... */}

//       <Dialog
//         open={isDeleteConfirmationOpen}
//         onClose={() => setIsDeleteConfirmationOpen(false)}
//       >
//         {/* Delete confirmation dialog content... */}
//       </Dialog>

//       <Dialog
//         open={editIndex > -1 || isUpdateMode}
//         onClose={() => {
//           setEditIndex(-1);
//           setEditedModelName("");
//           setIsUpdateMode(false);
//         }}
//       >
//         <DialogTitle>
//           {isUpdateMode ? "Update Model" : "Add New Model"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {isUpdateMode ? "Update the model name:" : "Enter the model name:"}
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Model Name"
//             type="text"
//             fullWidth
//             value={editedModelName}
//             onChange={(e) => setEditedModelName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => {
//               setEditIndex(-1);
//               setEditedModelName("");
//               setIsUpdateMode(false);
//             }}
//             color="primary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleSaveClick} color="primary">
//             {isUpdateMode ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
