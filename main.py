import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# ===============================
# 1. Ler CSV
# ===============================
print("Carregando dataset...")
df = pd.read_csv("data/A_Z Handwritten Data.csv").astype("float32")

# ===============================
# 2. Separar labels e pixels
# ===============================
labels = df.iloc[:, 0].values  # primeira coluna = letra (0=A, 25=Z)
pixels = df.iloc[:, 1:].values # resto = pixels

# ===============================
# 3. Normalizar e reshape
# ===============================
pixels /= 255.0
pixels = pixels.reshape(-1, 28, 28, 1)

# ===============================
# 4. Separar treino e teste
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    pixels, labels, test_size=0.2, random_state=42
)

# ===============================
# 5. Criar CNN
# ===============================
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation="relu", input_shape=(28,28,1)),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation="relu"),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(128, activation="relu"),
    layers.Dense(26, activation="softmax") # 26 letras
])

model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

model.summary()

# ===============================
# 6. Treinar
# ===============================
history = model.fit(X_train, y_train, epochs=3, batch_size=128, validation_split=0.1)

# ===============================
# 7. Avaliar
# ===============================
loss, acc = model.evaluate(X_test, y_test)
print(f"Acurácia no teste: {acc*100:.2f}%")

# ===============================
# 8. Salvar modelo
model.save("model/az_letters_cnn.h5")

# Salvar conjuntos de teste
np.save("model/X_test.npy", X_test)
np.save("model/y_test.npy", y_test)

print("Modelo e conjuntos de teste salvos!")



