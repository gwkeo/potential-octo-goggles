package slog

import (
	"log/slog"
)

type Log struct {
	logger *slog.Logger
	args   map[string]string
}

func NewSlog() *Log {
	return &Log{}
}

func (l *Log) Info(msg string, args ...map[string]interface{}) {
	l.logger.With(args).Info(msg)
}

func (l *Log) Debug(msg string, args ...map[string]interface{}) {
	l.logger.With(args).Debug(msg)
}

func (l *Log) Error(msg string, args ...map[string]interface{}) {
	l.logger.With(args).Error(msg)
}
