gen:
	protoc --proto_path=infrastructure/grpc infrastructure/grpc/protofile/*.proto --go_out=infrastructure/ --go-grpc_out=infrastructure/
