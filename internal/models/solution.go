package models

type Solution struct {
	Task    string `json:"task"`
	Name    string `json:"name"`
	Formula string `json:"formula"`
	Focus1  struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"focus1"`
	Focus2 struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"focus2"`
	ECCenter   string `json:"ec_center"`
	Parameter  string `json:"parameter"`
	Direct1    string `json:"direct1"`
	Direct2    string `json:"direct2"`
	SemiAxisA  string `json:"semi_axis_a"`
	SemiAxisB  string `json:"semi_axis_b"`
	Asymptote1 string `json:"asymptote1"`
	Asymptote2 string `json:"asymptote2"`
	Center     struct {
		X string `json:"x"`
		Y string `json:"y"`
	} `json:"center"`
}
