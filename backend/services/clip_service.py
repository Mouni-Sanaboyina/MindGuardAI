from PIL import Image

from transformers import (
    BlipProcessor,
    BlipForConditionalGeneration,
    CLIPProcessor,
    CLIPModel
)

import torch

# -------------------------
# BLIP Caption Model
# -------------------------

blip_processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

blip_model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

# -------------------------
# CLIP Classification Model
# -------------------------

clip_processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)

clip_model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

# -------------------------
# IMAGE CAPTION
# -------------------------

async def generate_caption(image_path: str):

    image = Image.open(image_path).convert("RGB")

    inputs = blip_processor(
        image,
        return_tensors="pt"
    )

    output = blip_model.generate(
        **inputs,
        max_new_tokens=50
    )

    caption = blip_processor.decode(
        output[0],
        skip_special_tokens=True
    )

    return caption


# -------------------------
# CLIP DETECTION
# -------------------------

async def detect_labels(image_path: str):

    image = Image.open(image_path).convert("RGB")

    labels = [
        "safe image",
        "weapon",
        "gun",
        "violence",
        "fight",
        "blood",
        "self harm",
        "suicide",
        "adult content",
        "hate symbol",
        "dangerous activity"
    ]

    inputs = clip_processor(
        text=labels,
        images=image,
        return_tensors="pt",
        padding=True
    )

    outputs = clip_model(**inputs)

    logits = outputs.logits_per_image
    probs = logits.softmax(dim=1)[0]

    results = {}

    for label, score in zip(labels, probs):
        results[label] = round(
            float(score) * 100,
            2
        )

    return results