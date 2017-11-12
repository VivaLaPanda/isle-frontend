# Mapping port 8080 from within the container to 18080 of the instance, likewise with the gRPC port 9080.
#windows
#initial
docker create -v /dgraph --name data dgraph/dgraph
docker run -it -p 8080:8080 -p 9090:9080 --volumes-from data --name dgraph dgraph/dgraph dgraphzero -w zw
docker exec -it dgraph dgraph --bindall=true --memory_mb 2048 -peer 127.0.0.1:8888

docker start -i dgraph
docker exec -it dgraph dgraph --bindall=true --memory_mb 2048 -peer 127.0.0.1:8888
