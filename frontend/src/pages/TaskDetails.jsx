import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask } from "../api/tasks";
import { toastError } from "../utils/toast";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTask(id);
        setTask(res.data);
      } catch (err) {
        toastError("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!task)
    return (
      <Typography color="error" align="center" mt={5}>
        Task not found
      </Typography>
    );

  const statusColor =
    task.status === "completed"
      ? "success.main"
      : task.status === "in-progress"
      ? "warning.main"
      : "grey.600";

  return (
    <Box maxWidth="700px" mx="auto" mt={5}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Card elevation={4}>
        <CardContent>
          {/* Title */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {task.title}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {task.description}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Status */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Status:
            </Typography>
            <Chip
              label={task.status}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                backgroundColor: statusColor,
                color: "white",
              }}
            />
          </Stack>

          {/* Created By */}
          <Typography variant="subtitle1" fontWeight="bold">
            Created By:
          </Typography>
          <Typography variant="body2">
            {task.createdBy?.name} ({task.createdBy?.email})
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Timestamps */}
          <Typography variant="body2">
            <strong>Created:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </Typography>

          <Typography variant="body2">
            <strong>Updated:</strong>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskDetails;
