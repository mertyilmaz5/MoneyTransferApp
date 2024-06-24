import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

df = pd.read_csv('C:\\Users\\dilara\\OneDrive\\Belgeler\\VS Code\\hackathon\\MoneyTransferApp\\transfer_dataset.csv')

X = df[['TransferAmount']]

model = IsolationForest(contamination=0.05, random_state=42)
model.fit(X)

model_file = 'C:\\Users\\dilara\\OneDrive\\Belgeler\\VS Code\\hackathon\\MoneyTransferApp\\isolation_forest_model.pkl'
joblib.dump(model, model_file)

# Anomali tespiti fonksiyonu
def check_anomaly(amount):
    result = model.predict([[amount]])
    if result == -1:
        return "Anomaly tespit edildi."
    else:
        return "Onaylandı"

amount = float(input("Göndermek istediğiniz miktarı girin: "))
print(check_anomaly(amount))
