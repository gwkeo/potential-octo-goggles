// Package message пакет выполняет функции оборачивания
// ошибок в более красивую форму
package message

import "fmt"

// Wrap оборачивает сообщение об ошибке в описание процесса,
// преведшего к этому
func Wrap(msg string, err error) string {
	return fmt.Sprintf("%v: %v", msg, err)
}
