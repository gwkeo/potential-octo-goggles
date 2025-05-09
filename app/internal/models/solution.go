package models

type Solution struct {
	Task    string `json:"task"`
	Formula string `json:"formula"`
	Name    string `json:"name"`
	Focus1  struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"focus1"`
	Focus2 struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"focus2"`
	ECCenter   string `json:"eccenter"`
	Parameter  string `json:"parameter"`
	Direct1    string `json:"direct1"`
	Direct2    string `json:"direct2"`
	SemiAxisA  string `json:"semiaxis_a"`
	SemiAxisB  string `json:"semiaxis_b"`
	Asymptote1 string `json:"asymptote1"`
	Asymptote2 string `json:"asymptote2"`
	Center     struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"center"`
}

type Point struct {
	X string `json:"x"`
	Y string `json:"y"`
}
