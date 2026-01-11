import torch
import torchvision.transforms as transforms
from PIL import Image
import torchvision.models as models

device = "cuda" if torch.cuda.is_available() else "cpu"

# Load pretrained ResNet
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
model.fc = torch.nn.Linear(model.fc.in_features, 2)  # safe / unsafe
model.to(device)
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
