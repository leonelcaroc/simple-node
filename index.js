import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const fruits = [];

app.get("/", (req, res) => {
  res.status(200).json({ data: fruits });
});

app.post("/", (req, res) => {
  const { fruit } = req.body;
  const newId = uuidv4();

  fruits.push({ id: newId, fruit: fruit });

  res.status(201).json({ message: `Created new fruit ${fruit}` });
});

app.put("/", (req, res) => {
  const { id, fruit } = req.body;

  const index = fruits.findIndex((fruit) => fruit.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Fruit not found" });
  }

  // Update the fruit
  if (fruit !== undefined) fruits[index].fruit = fruit;

  res.status(200).json({ message: "Fruit updated", fruit: fruits[index] });
});

app.delete("/", (req, res) => {
  const { id } = req.body;

  const index = fruits.findIndex((fruit) => fruit.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Fruit not found" });
  }

  const deleted = fruits.splice(index, 1); // remove the fruit

  res.status(200).json({ message: "Fruit deleted", fruit: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
