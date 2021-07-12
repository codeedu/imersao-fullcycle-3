package kafka

import (
	"os"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

type KafkaProducer struct {
	Producer *ckafka.Producer
}

func NewKafkaProducer() KafkaProducer {
	return KafkaProducer{}
}

func (k *KafkaProducer) SetupProducer(bootstrapServer string) {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": bootstrapServer,
		"security.protocol": os.Getenv("security.protocol"),
		"sasl.mechanisms":   os.Getenv("sasl.mechanisms"),
		"sasl.username":     os.Getenv("sasl.username"),
		"sasl.password":     os.Getenv("sasl.password"),
	}
	k.Producer, _ = ckafka.NewProducer(configMap)
}

func (k *KafkaProducer) Publish(msg string, topic string) error {
	message := &ckafka.Message{
		TopicPartition: ckafka.TopicPartition{Topic: &topic, Partition: ckafka.PartitionAny},
		Value:          []byte(msg),
	}
	err := k.Producer.Produce(message, nil)
	if err != nil {
		return err
	}
	return nil
}
