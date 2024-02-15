// import React, { useEffect, useState } from "react";
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
// } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
// import { deleteModel } from "../../../store/slices/deleteModelSlice";
// import { updateModel } from "../../../store/slices/updateModelSlice";
// import { getAllModel } from "../../../store/slices/CarSlices/carModelSlice";
// import { postCarModel } from "../../../store/slices/addCarModelSlice";



// export default function ModelTable() {

//   const dispatch = useAppDispatch();
//   const Models = useAppSelector((state) => state.carModel.data);
//   const [editIndex, setEditIndex] = useState(-1);
//   const [editedModelName, setEditedModelName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState(false);
//   const [selectedModelToDelete, setSelectedModelToDelete] =
//     useState<any>(null);
//   const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
//     useState(false);
//   const [updatedModelNameConfirmation, setUpdatedModelNameConfirmation] =
//     useState("");
//   const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(getAllModel());
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]); 

//   const handleEditClick = (index: any, name: any) => {
//     setEditIndex(index);
//     setEditedModelName(name);
//   };

//   const handleInputChange = (e: any) => {
//     setEditedModelName(e.target.value);
//   };

//   const handleSaveClick = async (Model: any) => {
//     const updatedModel = { ...Model, name: editedModelName };

//     const isExistingModel = Models.some(
//       (item) =>
//         item.name.toLowerCase() === editedModelName.toLowerCase() &&
//         item.id !== Model.id
//     );

//     if (isExistingModel) {
//       console.error("This fuel type already exists");
//       return;
//     }

//     setUpdatedModelNameConfirmation(editedModelName);
//     setIsUpdateConfirmationOpen(true);
//   };

//   const handleAddRowClick = () => {
//     setIsNewRecordDialogOpen(true);
//   };

//   const handleDeleteClick = async (Model: any) => {
//     setSelectedModelToDelete(Model);
//     setIsDeleteConfirmationOpen(true);
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       await dispatch(deleteModel({ id: selectedModelToDelete.id }));
//       await dispatch(getAllModel());
//       setIsDeleteConfirmationOpen(false);
//     } catch (error) {
//       console.error("Error deleting fuel type:", error);
//     }
//   };

//   const handleSaveNewRecord = async () => {
//     try {
//       const newModel = { name: editedModelName, brandId: selectedBrand };
//       await dispatch(postCarModel(newModel));
//       await dispatch(getAllModel());
//       setEditedModelName("");
//       setIsNewRecordDialogOpen(false);
//     } catch (error) {
//       console.error("Error adding new record:", error);
//     }
//   };

//   const handleUpdateConfirmation = async () => {
//     try {
//       const updatedModel = {
//         ...Models[editIndex],
//         name: editedModelName,
//       };
//       await dispatch(updateModel(updatedModel));
//       await dispatch(getAllModel());
//       setEditIndex(-1);
//       setEditedModelName("");
//       setIsUpdateConfirmationOpen(false);
//     } catch (error) {
//       console.error("Error updating fuel type:", error);
//     }
//   };

//   const filteredModels = Models.filter((Model) =>
//   Model.name?.toLowerCase().includes(searchQuery.toLowerCase())
// );




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
//       <TableContainer component={Paper} style={{ maxHeight: 450 }}>
//         <Table aria-label="customized table" stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ backgroundColor: "white", width: 50 }}>
//                 ID
//               </TableCell>
//               <TableCell style={{ backgroundColor: "white", width: 200 }}>
//                 Name
//               </TableCell>
//               <TableCell style={{ backgroundColor: "white", width: 200 }}>
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredModels.map((Model, i) => (
//               <TableRow
//                 key={Model.id}
//                 style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#ffffff" }}
//               >
//                 <TableCell>{i + 1}</TableCell>
//                 <TableCell>
//                   {editIndex === i ? (
//                     <TextField
//                       value={editedModelName}
//                       onChange={handleInputChange}
//                       size="small"
//                     />
//                   ) : (
//                     Model.name
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editIndex === i ? (
//                     <>
//                       <IconButton onClick={() => handleSaveClick(Model)}>
//                         <SaveIcon />
//                       </IconButton>
//                       <IconButton onClick={() => setEditIndex(-1)}>
//                         <CancelIcon />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       <IconButton
//                         onClick={() => handleEditClick(i, Model.name)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => handleDeleteClick(Model)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog
//         open={isDeleteConfirmationOpen}
//         onClose={() => setIsDeleteConfirmationOpen(false)}
//       >
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to permanently delete this record?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setIsDeleteConfirmationOpen(false)}
//             color="primary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
//             Yes, delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={isUpdateConfirmationOpen}
//         onClose={() => setIsUpdateConfirmationOpen(false)}
//       >
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to update the name to "
//             {updatedModelNameConfirmation}"?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setIsUpdateConfirmationOpen(false)}
//             color="primary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateConfirmation} color="primary" autoFocus>
//             Yes, update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={isNewRecordDialogOpen}
//         onClose={() => setIsNewRecordDialogOpen(false)}
//       >
//         <DialogTitle>Add a New Fuel Type Name</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter the name of the new fuel type:
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Fuel Type Name"
//             type="text"
//             fullWidth
//             value={editedModelName}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setIsNewRecordDialogOpen(false)}
//             color="primary"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleSaveNewRecord} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
