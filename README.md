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


# inKub8

# **What is inKub8?**

inKub8 is an open source tool for visualizing and monitoring your Kubernetes cluster. It integrates with prometheus and grafana allowing you to scrape detailed metrics from your cluster and transform those metrics into beautiful and easy to understand charts and graphs.

# inKub8 Functionality
Installing inKub8 provides you access to three pages that each provide their own data and functionality that give you extensive access to your Kubernetes cluster.

# Cluster Overview
The landing page provides you with a visual representation of your Kubernetes cluster with the different nodes and their relationships illustrated using the Cytoscape.js library. When a node is clicked, it’s corresponding metrics are loaded on the right side for fast, efficient monitoring. The cluster’s nodes can be customized to the user’s preferences maximizing the user’s ability to respond to threats to the cluster.

<img src="https://raw.githubusercontent.com/oslabs-beta/inKub8/main/src/assets/img/landingPage.gif">

# Integrated Command Line
The home page also comes with an integrated command line that allows the user to make kubectl commands directly in the application.

<img src="https://raw.githubusercontent.com/oslabs-beta/inKub8/main/src/assets/img/terminal%20zoomed.gif">

# Metrics Dashboards
Our metrics page employs complete Grafana integration allowing the user to manage and organize their dashboards. These dashboards contain all the vital data a user will need to monitor their Kubernetes cluster including memory and CPU usage by pod, received/transmitted bandwidth, and average scrape interval duration.

<img src="https://raw.githubusercontent.com/oslabs-beta/inKub8/main/src/assets/img/metricsPage.gif">

# Prometheus Dashboard
The prometheus page exposes the full prometheus dashboard allowing you to view different alerts, execute PromQL queries, and more.

<img src="https://raw.githubusercontent.com/oslabs-beta/inKub8/main/src/assets/img/prometheusPage.gif">

# Requirements

In this readme we will walk you through how to setup inkub8 for your Kubernetes cluster. You will need the following:
 - Install either minikube or Docker Desktop to let you run Kubernetes locally
 - Install Kubectl https://kubernetes.io/docs/tasks/tools/ (skip if you are using Docker Desktop)

# Installaiton
inKub8 must be used on the same machine where your kubectl is configured to access your cluster. Also you must have have prometheus and grafana running in your cluster and port-forwarded to ports 9090 and 3000, respectively.

1. To use the application, follow the following steps:
2. Download the binary from the releases page of our github and install
3. If you don't already have prometheus and grafana deployed to your cluster, use helm to deploy them
	4. 	Install Helm https://helm.sh/docs/intro/install/
	5. 	Add the prometheus helm chart by running the command `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
	6. 	Deploy prometheus and grafana to your cluster by running the command `helm install prometheus prometheus-community/kube-prometheus-stack`
7. Port forward prometheus to port 9090 and grafana to port 3000.
    8. 	If you installed using helm you can use the commands `kubectl port-forward deployment/prometheus-grafana 3000` and `kubectl port-forward pod/prometheus-prometheus-kube-prometheus-prometheus-0 9090`
9. Run inKub8 and your cluster information should be displayed

# About the Team

## Ali Elhawary
- LinkedIn: https://github.com/alielhawary
- Github: https://www.linkedin.com/in/alielhawary/

## Clinton Quach

- LinkedIn: https://github.com/klintonkuach
- Github: https://www.linkedin.com/in/clintonquach/

## Daniel Geiger

- LinkedIn: https://github.com/UncaughtDanError
- Github: https://www.linkedin.com/in/daniel-geiger-90792113/

## Elijah Tang

- LinkedIn: https://github.com/elijahtang
- Github: https://www.linkedin.com/in/elijah-tang/

## Gunnar Marino

- LinkedIn: https://github.com/kingfly555
- Github: https://www.linkedin.com/in/gunnarmarino/

## Links

- Website: 
- Github: https://github.com/oslabs-beta/inKub8