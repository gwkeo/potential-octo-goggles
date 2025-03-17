package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gwkeo/potential-octo-goggles/app/internal/models"
	"github.com/gwkeo/potential-octo-goggles/app/internal/utils/message"
	"io"
	"net/http"
	"strconv"
)

type Adder interface {
	Add(ctx context.Context, assignment *models.Assignment) (int64, error)
}

type AssignmentReader interface {
	Read(ctx context.Context, id int64) ([]models.Assignment, error)
}

type AssignmentsController struct {
	adder  Adder
	reader AssignmentReader
}

func NewController(adder Adder, reader AssignmentReader) *AssignmentsController {
	return &AssignmentsController{
		adder:  adder,
		reader: reader,
	}
}

func (c *AssignmentsController) HandlePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, message.Wrap("error parsing response body", err), http.StatusInternalServerError)
		return
	}

	var a models.Assignment
	err = json.Unmarshal(body, &a)
	if err != nil {
		http.Error(w, message.Wrap("error unmarshalling response body", err), http.StatusBadRequest)
		return
	}

	id, err := c.adder.Add(ctx, &a)
	if err != nil {
		http.Error(w, message.Wrap("error adding assignment to db", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(fmt.Sprintf("%v", id)))
}

func (c *AssignmentsController) HandleGet(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	rawId := r.URL.Query().Get("user_id")
	if rawId == "" {
		http.Error(w, message.Wrap("user_id not specified", nil), http.StatusBadRequest)
		return
	}

	id, err := strconv.ParseInt(rawId, 10, 64)
	if err != nil {
		http.Error(w, message.Wrap("unable to parse int", err), http.StatusBadRequest)
		return
	}

	assignments, err := c.reader.Read(ctx, id)
	if err != nil {
		fmt.Println(assignments, err.Error())
		if len(assignments) == 0 {
			http.Error(w, message.Wrap("not found", err), http.StatusNotFound)
			return
		}
		http.Error(w, message.Wrap("error reading assignments from db: ", err), http.StatusInternalServerError)
		return
	}

	var response []byte
	response, err = json.Marshal(assignments)
	if err != nil {
		http.Error(w, message.Wrap("error while marshaling json response", err), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}
