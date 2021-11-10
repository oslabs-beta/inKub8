# inKub8
Creating a Kubernetes Visualizer

git 
NOTE:
kubectl port-forward deployment/prometheus-grafana 3000
kubectl port-forward pod/prometheus-prometheus-kube-prometheus-prometheus-0 9090

Grafana password
prom-operator

helm install prometheus prometheus-community/kube-prometheus-stack


How To Deploy and Use inKub8
donwload the release from the Github release page and install the app. 
the app will connect to your Kubernetes cluster through the Kubernetes API so it needs to be run on the same computer. 

install dependencies after 

make sure you already have prometheus and grafana installed already, but if not install it using helm. 
-list out the steps for installing prometheus and grafana and how to deploy it in your cluster.
